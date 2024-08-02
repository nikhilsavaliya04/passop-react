import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Manager() {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);


  const getPassword = async () => {
    let req = await fetch("https://localhost:3000/")
    let passwords = await req.json();
    setpasswordArray(passwords)
    console.log(passwords)
  }
  

  useEffect(() => {
    getPassword()
    
  }, []);


  const copyText = (text) => {
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    navigator.clipboard.writeText(text)
  }

  const showPassword = () => {
    passwordRef.current.type = "text";
    console.log(ref.current.src);
    if (ref.current.src.includes("icons/hide.png")) {
      ref.current.src = "icons/view.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "icons/hide.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = async () => {
    if(form.site.length > 3 && form.username.length > 3 && form.password.length)
    {
       await fetch("http://localhost:3000", {method: "DELETE", headers: {"content-Type": "application/json"},
        body: JSON.stringify({id: form.id}) })

    setpasswordArray([...passwordArray, {...form, id: uuidv4()}])
    //localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
    //console.log([...passwordArray, form]);
    await fetch("http://localhost:3000", {method: "POST", headers: {"content-Type": "application/json"},
    body: JSON.stringify({...form, id: uuidv4() }) })
    setform({ site: "", username: "", password: "" })
    toast('Password saved !', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    }
    else{
      toast('Error : Password not saved !')
    }
  };

  const deletePassword = async(id) => {
    console.log("Deleting password with id" + id)
    let c = confirm("Do you really want to delete this password ?")
    if(c){
    setpasswordArray(passwordArray.filter(item=>item.id!==id))
    //localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
    let  res = await fetch("http://localhost:3000", {method: "DELETE", headers: {"content-Type": "application/json"},
      body: JSON.stringify({id}) })
    toast('Password deleted !', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }};

  const editPassword = (id) => {
    console.log("Editing password with id" + id)
    setform({...passwordArray.filter(i=>i.id===id)[0],id: id})
    setpasswordArray(passwordArray.filter(item=>item.id!==id))
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition= "Bounce"
          />
      {/* Same as */}
      <ToastContainer />
      <div className="text-black absolute top-0 z-[-2] h-screen w-screen bg-green-80 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
      <div className="p-2 pt-12 md:mycontainer min-h-[88vh]">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-500">&lt;</span>
          <span className="text-black">Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-700 text-lg text-center">
          Your Own Password Manager
        </p>

        <div className="text-white flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="text-black rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex-col md:flex-row flex w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="text-black rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="text-black rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/view.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center item-center bg-green-500 rounded-full gap-2 px-8 py-2 w-fit border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/zrkkrrpl.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#121331,secondary:#000000"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white">
                        <div className="flex justify-center items-center">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                        <div className="cursor-pointer  size-7" onClick={()=>{copyText(item.site)}}>
                          <lord-icon
                            style={{"width":"25px", "height":"25px", "paddingTop":"3px", "paddingLeft":"3px"}}
                            className={"cursor-pointer"}
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white justify-center text-center">
                      <div className="flex justify-center items-center">
                        {item.username}
                        <div className="cursor-pointer  size-7" onClick= {()=>{copyText(item.username)}}>
                          <lord-icon
                            style={{"width":"25px", "height":"25px", "paddingTop":"3px", "paddingLeft":"3px"}}
                            className={"cursor-pointer"}
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                      <div className="flex justify-center items-center">
                        {"*".repeat(item.password.length)}
                        <div className="cursor-pointer  size-7" onClick={()=>{copyText(item.password)}}>
                          <lord-icon
                            style={{"width":"25px", "height":"25px", "paddingTop":"3px", "paddingLeft":"3px"}}
                            className={"cursor-pointer"}
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white  text-center">
                      <span className="cursor-pointer mx-1" onClick={()=>{editPassword(item.id)}}>
                        <lord-icon
                            src="https://cdn.lordicon.com/qnpnzlkk.json"
                            trigger="hover"
                            style={{"width":"25px","height":"25px"}}>
                        </lord-icon>
                      </span>
                      <span className="cursor-pointer mx-1" onClick={()=>{deletePassword(item.id)}}>
                      <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          style={{"width":"25px","height":"25px"}}>
                      </lord-icon>
                      </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default Manager;
