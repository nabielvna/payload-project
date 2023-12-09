// auth.js
// 1. Fetch User
// 2. Set Login Status
// 3. Login User
// 4. Logout User
// 5. Fetch User Profile

// 1. Fetch User
export const fetchUserData = (token) => {
    return fetch("http://localhost:3000/api/staffs/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .catch(error => console.error('Error fetching user data:', error));
};

  // 2. Check Login Status
  export const checkLoggedInStatus = (setLoggedIn, setUserName) => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      setLoggedIn(true);
      const storedUserName = localStorage.getItem('userName');
      setUserName(storedUserName);
  
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        fetchUserData(authToken);
      }
    }
};
  
  // 3. Login User
export const loginUser = async (email, password, setEmail, setPassword, setLoggedIn, setUserName) => {
    try {
      const resp = await fetch("http://localhost:3000/api/staffs/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      if (!resp.ok) {
        const errorMsg = (await resp.json())?.error[0].message;
        throw new Error(errorMsg);
      }
  
      const responseData = await resp.json();
      const userName = responseData?.user?.nickname || responseData?.nickname;
      setUserName(userName);
  
      document.cookie = `authToken=${responseData.token}; path=/`;
  
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', userName);
      localStorage.setItem('authToken', responseData.token);
  
      setLoggedIn(true);
  
      fetchUserData(responseData.token);
    } catch (error) {
      console.error('Error saat login:', error);
      alert('Terjadi kesalahan saat login.');
    }
};
  
  // 4. Logout User
export const logoutUser = (setLoggedIn, setUserName) => {
    document.cookie = "authToken=; path=/";
    setLoggedIn(false);
    setUserName('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('authToken');
};

// 5. Fetch User Profile
export const fetchUserProfile = async (setUserProfile) => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      try {
        const resp = await fetch("http://localhost:3000/api/staffs/me", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
  
        if (!resp.ok) {
          throw new Error('Error fetching user profile');
        }
  
        const userData = await resp.json();
        // Simpan data profil pengguna dalam state
        setUserProfile(userData);
  
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }
};
  