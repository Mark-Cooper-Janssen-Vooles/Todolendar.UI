export const getCookie = (cname: string) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export const deleteCookies = () => {
    const expireTime = (new Date(Date.now() + -86400*1000)).toUTCString(); // set cookie to have expired yesterday
    document.cookie = `Authorization=;expires=${expireTime};path=/`
    document.cookie = `UserId=;expires=${expireTime};path=/`
}
