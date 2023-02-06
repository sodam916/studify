//아이디를 확인해주는 컴포넌트입니다.
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import LoginCard from "./LoginCard";
import LoginStyle from "../../Style/Login/Login.module.css";

const LoginID = () => {
  const [email, setEmail] = useState("");
  //쿠키 이름이 useremail입니다.

  //아이디 저장 체크박스 유무를 알려줍니다.
  const [isRemember, setIsRemember] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["useremail"]);
  const navigate = useNavigate();

  //페이지 최초 랜더링 될때
  useEffect(() => {
    //만약 쿠키 값이 있다면 체크박스를 true로 만들어주고 id부분에 값 세팅
    if (cookies.useremail !== undefined) {
      //값이 있다면?
      setEmail(cookies.useremail); //이메일의 값을 쿠키에 있는 값으로 넣어주고
      setIsRemember(true); //체크박스를 true로 만들어줍니다.
    }
  }, [cookies.useremail]);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`/api/v1/users/${email}`);
      //axios post요청으로 보내야합니다.
      console.log(response);
      if (isRemember) {
        setCookie("useremail", email);
      } else {
        removeCookie("useremail");
      }
      localStorage.setItem("email", email);
      //이메일을 로컬 스토리지에 저장..
      navigate("/user/login/pw");
    } catch (err) {
      console.log(err);
      swal("아이디가 잘못 입력 되었습니다. 다시입력해주세요");
    }
  };

  //체크박스가 바뀌는 것을 확인해줍니다.
  const togglecheck = (event) => {
    setIsRemember(event.target.checked); //체크박스를 이벤트 부분으로 확인.
  };
  return (
    <LoginCard>
      <form onSubmit={handleSubmit} className={LoginStyle.loginForm}>
        <h2 className={LoginStyle.loginText}>로그인(이메일)</h2>
        <div className={LoginStyle.loginEmailform}>
          <input
            type="text"
            id="email"
            value={email}
            name="email"
            onChange={handleChange}
            className={LoginStyle.loginTextform}
            placeholder="test@test.com"
          />
        </div>
        <fieldset>
          <input
            type="checkbox"
            id="saveid"
            onChange={togglecheck}
            checked={isRemember}
            className={LoginStyle.loginCheckboxform}
          />
          <label htmlFor="saveid">아이디저장</label>
        </fieldset>
        <div className={LoginStyle.loginBottom}>
          아이디가 존재하지 않으신가요? &nbsp;
          <Link to="/user/signup" className={LoginStyle.loginText_link}>
            회원가입
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button type="submit" className={LoginStyle.loginBtnform}>
            {">>>"}
          </button>
        </div>
      </form>
    </LoginCard>
  );
};

export default LoginID;
