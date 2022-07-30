import React, { useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth, database } from "./firebaseConnect";
import Swal from "sweetalert2";
import { ref, push, set } from "firebase/database";
import { useNavigate, Outlet } from "react-router-dom";

function youtube_parser(url) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
}

const Header = () => {
  const [isAuth, setIsAuth] = useState(false);
  const provider = new GoogleAuthProvider();
  const providerFacebook = new FacebookAuthProvider();
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then(function (result) {
      setUser(result);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Đăng nhập thành công",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsAuth(true);
    });
  };
  const signInWithFacebook = () => {
    signInWithPopup(auth, providerFacebook).then(function (result) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Đăng nhập thành công",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsAuth(true);
    });
  };
  const logout = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Đăng xuất thành công",
      showConfirmButton: false,
      timer: 1500,
    });
    setIsAuth(false);
  };

  const shareMovie = () => {
    navigate("/share");
    Swal.fire({
      title: "Youtube URL",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Share",
      showLoaderOnConfirm: true,
      preConfirm: (link) => {
        const stringUrl = youtube_parser(link);
        if (stringUrl) {
          const postListRef = ref(database, "ListYoutube");
          const newPostRef = push(postListRef);
          set(newPostRef, stringUrl);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thêm thành công",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire("Link youtube ko đúng");
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      navigate("/");
    });
  };

  return (
    <>
      <div className="mt-8">
        <div className="flex border border-blue-400 mx-auto w-11/12 rounded py-8 px-4 md:px-8">
          <h1 className="text-3xl mb-2 text-center font-bold w-full">
            <i className="fas fa-home"></i>&nbsp;Funny movies
          </h1>
          {isAuth ? (
            <>
              <h5 className="text-xl mb-2 text-center w-full">
                Welcome {user.user.email}
              </h5>
              <button
                onClick={() => shareMovie()}
                className="bg-red-500 hover:bg-red-600 w-full py-2 text-white"
              >
                Share a movie
              </button>
              <button
                onClick={() => logout()}
                className="bg-blue-500 hover:bg-blue-600 w-full py-2 text-white"
              >
                <i className="fas fa-sign-out"></i>&nbsp; Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => signInWithGoogle()}
                className="bg-red-500 hover:bg-red-600 w-full py-2 text-white"
              >
                <i className="fab fa-google-plus-g"></i>&nbsp;Sign in with
                Google
              </button>
              <button
                onClick={() => signInWithFacebook()}
                className="bg-blue-500 hover:bg-blue-600 w-full py-2 text-white"
              >
                <i className="fab fa-facebook-square"></i>&nbsp;Sign in with
                Facebook
              </button>
            </>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};
export default Header;
