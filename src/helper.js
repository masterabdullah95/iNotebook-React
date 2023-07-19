export const getToken = async ()=>{
    var token = await localStorage.getItem('token');
    return token;
}

export const saveToken = (token)=>{
    localStorage.setItem('token', token);
}