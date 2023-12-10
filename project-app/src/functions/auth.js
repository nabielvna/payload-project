// auth.js
// 1. Fetch User
// 2. Set Login Status
// 3. Login User
// 4. Logout User
// 5. Fetch User Profile

// 1. Fetch User
// auth.js

// 1. Fetch User
export const fetchUserData = (token) => {
  const userType = localStorage.getItem('userType'); // Ambil userType dari localStorage
  return fetch(`http://localhost:3000/api/${userType}s/me`, {
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
export const loginUser = async (userType, email, password, setEmail, setPassword, setLoggedIn, setUserName) => {
  try {
    const resp = await fetch(`http://localhost:3000/api/${userType}s/login`, {
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
    localStorage.setItem('userType', userType); // Menyimpan userType

    setLoggedIn(true);

    fetchUserData(responseData.token);
  } catch (error) {
    console.error('Error during login:', error);
    alert('An error occurred during login.');
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
    localStorage.removeItem('userType')
};

// 5. Fetch User Profile
export const fetchUserProfile = async (setUserProfile) => {
  const authToken = localStorage.getItem('authToken');
  const userType = localStorage.getItem('userType');

  if (authToken) {
    try {
      const resp = await fetch(`http://localhost:3000/api/${userType}s/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!resp.ok) {
        throw new Error('Error fetching user profile');
      }

      const userData = await resp.json();

      const profilePictureURL = userData?.user.profilePicture?.url;

      const fullProfilePictureURL = profilePictureURL
        ? `http://localhost:3000${profilePictureURL}`
        : null;

      

      // Update the user profile state with the full profile picture URL
      setUserProfile( fullProfilePictureURL );

    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }
};
