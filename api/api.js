
export const fetchUserLogin = async ({ username, password }) => {
    const respone = await fetch('https://fakestoreapi.com/auth/login',{
        method:'POST',
        headers: { "content-type": "application/json" },
        body:JSON.stringify({
            username: username,
            password: password
        })
    });
    return await respone.json();
};

export const fetchUserData = async (id) => {
    const respone = await fetch('https://fakestoreapi.com/users/' + id);
    return await respone.json();
};

export const fetchUpdateUserData = async ({ userData, userId }) => {
    const respone = await fetch('https://fakestoreapi.com/users/' + userId, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(userData),
    });
    return await respone.json();
};
 