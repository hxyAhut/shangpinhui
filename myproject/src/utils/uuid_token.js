// import { v4 as uuidv4} from 'uuid'
import uuid from 'uuid'

// 要生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {

    // 如果本地存储已经有UUID值，则使用本地存储中的值
    let uuid_token = localStorage.getItem('getUUID')
    
    // 如果本地存储中没有UUID值，则生成UUID值，并保存到本地存储中
    if (!uuid_token) {
        // uuid_token = uuidv4();
        uuid_token = uuid();
        localStorage.setItem('getUUID', uuid_token);
    }
    return uuid_token
}