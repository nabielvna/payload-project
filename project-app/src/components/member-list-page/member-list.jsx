import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MemberList() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/members?sort=name');
        const data = await response.json();

        if (data.docs && Array.isArray(data.docs)) {
          setMembers(data.docs);
        } else {
          console.error('Fetched data does not contain an array:', data);
        }
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div>
      <h1>Daftar Member</h1>
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            <Link to={`/members/${member.id}`}>
              {member.profilePicture && (
                <img
                  src={`http://localhost:3000${member.profilePicture.url}`} // sesuaikan dengan URL gambar
                  alt={`Profil ${member.name}`}
                  style={{ width: '50px', height: '50px', marginRight: '10px' }}
                />
              )}
              {member.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MemberList;
