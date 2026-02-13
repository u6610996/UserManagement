import { useUser } from "../contexts/UserProvider";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { logout } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [hasImage, setHasImage] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  async function onUpdateImage() {
    const file = fileInputRef.current?.files[0];
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/api/user/profile/image`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        alert("Image updated successfully.");
        fetchProfile();
      } else {
        alert("Failed to update image.");
      }
    } catch (err) {
      alert("Error uploading image.");
    }
  }

  async function fetchProfile() {
    const result = await fetch(`${API_URL}/api/user/profile`, {
      credentials: "include",
    });

    if (result.status === 401) {
      logout();
    } else {
      const data = await result.json();
      if (data.profileImage != null) {
        setHasImage(true);
      }
      setIsLoading(false);
      setData(data);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchProfile();
  }, []);

  return (
    <div>
      <h3>Profile</h3>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          ID: {data._id} <br />
          Email: {data.email} <br />
          First Name: {data.firstname} <br />
          Last Name: {data.lastname} <br />
          <br />
          Image:{" "}
          {hasImage && (
            <img
              src={`${API_URL}${data.profileImage}`}
              width={150}
              height={150}
              alt="profile"
            />
          )}
          <br />
          <input type="file" ref={fileInputRef} accept="image/*" />
          <button onClick={onUpdateImage}>Update Image</button>
        </div>
      )}
      <br />
      <button onClick={() => navigate("/logout")}>Logout</button>
    </div>
  );
}
