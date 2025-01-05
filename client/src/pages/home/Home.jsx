import AuthContext from "../../authContext/AuthContext";
import { useContext } from "react";

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <div
      className="flex justify-center items-center 
      space-y-2 lg:px-"
    >
      {user ? (
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <img
              src={user?.photoURL}
              alt=""
              className="w-28 h-28 rounded-full flex"
            />
          </div>
          <h1 className="font-bold">
            {user ? `Welcome ${user?.displayName}` : "Welcome to the Home Page"}
          </h1>
          <p className="">Email: {user?.email}</p>

          <div className="">
            <p>UID: {user?.uid}</p>
          </div>

          <div className="">
            <p>Provider: {user?.providerId}</p>{" "}
          </div>

          <div className="">
            {/* <p className="max-w-96 mx-auto">Token: {user?.refreshToken}</p> */}
          </div>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed omnis
            dignissimos nihil tempore ratione velit blanditiis optio culpa nisi
            cupiditate excepturi corrupti, labore a, ad cum dolor vel quasi
            provident.
          </p>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed omnis
            dignissimos nihil tempore ratione velit blanditiis optio culpa nisi
            cupiditate excepturi corrupti, labore a, ad cum dolor vel quasi
            provident.
          </p>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed omnis
            dignissimos nihil tempore ratione velit blanditiis optio culpa nisi
            cupiditate excepturi corrupti, labore a, ad cum dolor vel quasi
            provident.
          </p>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed omnis
            dignissimos nihil tempore ratione velit blanditiis optio culpa nisi
            cupiditate excepturi corrupti, labore a, ad cum dolor vel quasi
            provident.
          </p>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed omnis
            dignissimos nihil tempore ratione velit blanditiis optio culpa nisi
            cupiditate excepturi corrupti, labore a, ad cum dolor vel quasi
            provident.
          </p>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed omnis
            dignissimos nihil tempore ratione velit blanditiis optio culpa nisi
            cupiditate excepturi corrupti, labore a, ad cum dolor vel quasi
            provident.
          </p>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed omnis
            dignissimos nihil tempore ratione velit blanditiis optio culpa nisi
            cupiditate excepturi corrupti, labore a, ad cum dolor vel quasi
            provident.
          </p>
        </div>
      ) : (
        <h1 className="text-3xl font-bold justify-center">Blog Home Page</h1>
      )}
    </div>
  );
};

export default Home;
