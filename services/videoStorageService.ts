
const DB_NAME = 'UberDriverApp_VideoStorage_v7'; // Versão incrementada para garantir nova estrutura limpa
const STORE_NAME = 'videos';
const DEFAULT_VIDEO_KEY = 'verification_video_default';

let dbInstance: IDBDatabase | null = null;

/**
 * Retorna a chave do vídeo baseada no ID da sessão.
 */
const getVideoKey = (identifier?: string) => {
  const sessionId = identifier || localStorage.getItem('UBER_V5_CURRENT_USER_ID');
  return sessionId ? `verification_video_${sessionId}` : DEFAULT_VIDEO_KEY;
};

/**
 * Inicializa ou retorna a instância do banco de dados IndexedDB.
 */
const getDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (dbInstance) return resolve(dbInstance);

    console.log(`[videoStorageService] Abrindo banco de dados: ${DB_NAME}`);
    try {
      const request = indexedDB.open(DB_NAME, 7);

      request.onerror = () => {
        console.error('[videoStorageService] Erro ao abrir IndexedDB:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        dbInstance = request.result;
        console.log('[videoStorageService] Banco de dados aberto com sucesso');
        
        // Monitorar fechamento inesperado
        dbInstance.onclose = () => {
          console.warn('[videoStorageService] Banco de dados fechado inesperadamente');
          dbInstance = null;
        };
        
        resolve(dbInstance);
      };

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        console.log('[videoStorageService] Upgrade do banco necessário (v7)');
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
          console.log(`[videoStorageService] Object store '${STORE_NAME}' criado`);
        }
      };
    } catch (e) {
      console.error('[videoStorageService] Exceção ao abrir banco:', e);
      reject(e);
    }
  });
};

/**
 * Converte um Blob/File para uma string Base64 (Data URL).
 */
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Falha ao converter Blob para Base64: resultado não é string'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
};

/**
 * Salva o vídeo no IndexedDB como Base64.
 */
export const saveVideo = async (video: File | Blob, identifier?: string): Promise<void> => {
  const key = getVideoKey(identifier);
  console.log(`[videoStorageService] Salvando vídeo para chave: ${key} (Tamanho: ${video.size} bytes)`);
  
  try {
    const base64 = await blobToBase64(video);
    console.log(`[videoStorageService] Conversão para Base64 concluída (${base64.length} caracteres)`);
    
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      const dataToSave = {
        data: base64,
        type: video.type || 'video/mp4',
        timestamp: Date.now(),
        size: video.size
      };
      
      const request = store.put(dataToSave, key);
      
      request.onsuccess = () => {
        console.log(`[videoStorageService] Vídeo salvo com sucesso no IndexedDB para ${key}`);
      };
      
      request.onerror = () => {
        console.error('[videoStorageService] Erro ao salvar vídeo no store:', request.error);
        reject(request.error);
      };
      
      transaction.oncomplete = () => {
        console.log('[videoStorageService] Transação de salvamento concluída');
        resolve();
      };
      
      transaction.onerror = () => {
        console.error('[videoStorageService] Erro na transação de salvamento:', transaction.error);
        reject(transaction.error);
      };
    });
  } catch (error) {
    console.error('[videoStorageService] Falha crítica ao salvar vídeo:', error);
    throw error;
  }
};

/**
 * Recupera o vídeo do IndexedDB como uma string Base64.
 */
export const getVideo = async (identifier?: string): Promise<string | null> => {
  const key = getVideoKey(identifier);
  console.log(`[videoStorageService] Recuperando vídeo para chave: ${key}`);
  
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);
      
      request.onsuccess = () => {
        const result = request.result;
        if (!result) {
          console.log(`[videoStorageService] Nenhum vídeo encontrado para ${key}`);
          return resolve(null);
        }
        
        // Se já for string (Base64), retorna direto
        if (typeof result === 'string') {
          console.log(`[videoStorageService] Vídeo recuperado como string direta (${result.length} chars)`);
          return resolve(result);
        }
        
        // Se for o objeto novo {data: base64, ...}
        if (result.data && typeof result.data === 'string') {
          console.log(`[videoStorageService] Vídeo recuperado do objeto data (${result.data.length} chars)`);
          return resolve(result.data);
        }
        
        // Fallback para Blobs antigos (se existirem)
        const blob = result.data instanceof Blob ? result.data : (result instanceof Blob ? result : null);
        if (blob) {
          console.log('[videoStorageService] Vídeo antigo (Blob) detectado, convertendo para Base64...');
          blobToBase64(blob)
            .then(async base64 => {
              console.log(`[videoStorageService] Conversão fallback concluída (${base64.length} chars). Atualizando banco...`);
              // Auto-upgrade: Salva de volta como Base64 para as próximas vezes
              try {
                const upgradeDb = await getDB();
                const upgradeTx = upgradeDb.transaction([STORE_NAME], 'readwrite');
                upgradeTx.objectStore(STORE_NAME).put({
                  data: base64,
                  type: blob.type || 'video/mp4',
                  timestamp: Date.now(),
                  upgraded: true
                }, key);
              } catch (e) {
                console.warn('[videoStorageService] Falha ao auto-atualizar vídeo para Base64:', e);
              }
              resolve(base64);
            })
            .catch(err => {
              console.error('[videoStorageService] Erro na conversão fallback:', err);
              reject(err);
            });
          return;
        }
        
        console.warn('[videoStorageService] Formato de dados desconhecido no IndexedDB:', result);
        resolve(null);
      };
      
      request.onerror = () => {
        console.error('[videoStorageService] Erro ao buscar vídeo:', request.error);
        reject(request.error);
      };
    });
  } catch (error) {
    console.error('[videoStorageService] Falha crítica ao recuperar vídeo:', error);
    return null;
  }
};

/**
 * Deleta o vídeo do IndexedDB.
 */
export const deleteVideo = async (identifier?: string): Promise<void> => {
  const key = getVideoKey(identifier);
  console.log(`[videoStorageService] Deletando vídeo para chave: ${key}`);
  
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(key);
      
      request.onsuccess = () => {
        console.log(`[videoStorageService] Vídeo deletado com sucesso para ${key}`);
        resolve();
      };
      
      request.onerror = () => {
        console.error('[videoStorageService] Erro ao deletar vídeo:', request.error);
        reject(request.error);
      };
    });
  } catch (error) {
    console.error('[videoStorageService] Falha crítica ao deletar vídeo:', error);
  }
};

/**
 * Renomeia o vídeo de uma sessão para outra.
 */
export const renameVideo = async (oldSessionId: string, newSessionId: string): Promise<void> => {
  const oldKey = `verification_video_${oldSessionId}`;
  const newKey = `verification_video_${newSessionId}`;
  console.log(`[videoStorageService] Renomeando vídeo de ${oldKey} para ${newKey}`);
  
  try {
    const db = await getDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    const getRequest = store.get(oldKey);
    getRequest.onsuccess = () => {
      const data = getRequest.result;
      if (data) {
        store.put(data, newKey);
        store.delete(oldKey);
        console.log('[videoStorageService] Renomeação concluída com sucesso');
      }
    };
  } catch (error) {
    console.error('[videoStorageService] Erro ao renomear vídeo:', error);
  }
};

/**
 * Duplica o vídeo de uma sessão para outra.
 */
export const duplicateVideo = async (sourceSessionId: string, targetSessionId: string): Promise<void> => {
  const sourceKey = `verification_video_${sourceSessionId}`;
  const targetKey = `verification_video_${targetSessionId}`;
  console.log(`[videoStorageService] Duplicando vídeo de ${sourceKey} para ${targetKey}`);
  
  try {
    const db = await getDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    const getRequest = store.get(sourceKey);
    getRequest.onsuccess = () => {
      const data = getRequest.result;
      if (data) {
        store.put(data, targetKey);
        console.log('[videoStorageService] Duplicação concluída com sucesso');
      }
    };
  } catch (error) {
    console.error('[videoStorageService] Erro ao duplicar vídeo:', error);
  }
};

/**
 * Inicializa o banco de dados.
 */
export const initDB = async () => {
  return await getDB();
};
