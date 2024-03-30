import React, { useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-regular-svg-icons'
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ authenticate, setAuthenticate }) => {
  const menuList = ['여성', 'Divided', '남성', '신생아/유아', '아동', 'H&M HOME', 'Sale', '지속가능성']
  let [width, setWidth] = useState(0);
  const navigate = useNavigate()
  const goToLogin = () => {
    navigate('/login')
  }
  const search = (event) => {
    if(event.key === "Enter"){
      let keyword = event.target.value
      console.log("a", keyword)
      navigate(`/?q=${keyword}`)
    }
  }
  return (
    <div>
      <div className="side-menu" style={{ width: width }}>
        <button className="xbutton"onClick={() => setWidth(0)}>
          &times;
        </button>
        <div className="side-menu-list" id="menu-list">
          {menuList.map((menu, index) => (
            <button key={index}>{menu}</button>
          ))}
        </div>
      </div>
      <div className="nav-top">
        <div className="hide">
            <FontAwesomeIcon icon={faBars} onClick={() => setWidth(250)} />
        </div>
        {authenticate? (
          <div onClick={() => setAuthenticate(false)} className="login-button">
            <FontAwesomeIcon icon={faUser} />
            <div>로그아웃</div>
          </div>
        ):(
          <div onClick={goToLogin} className="login-button">
            <FontAwesomeIcon icon={faUser} />
            <div>로그인</div>
          </div>
        )}
      </div>
      <div className="nav-section" onClick={()=>navigate('/')}>
        <img width={100} src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/709px-H%26M-Logo.svg.png' alt=''/>
      </div>
      <div className="menu-area">
        <ul className="menu-list">
          {menuList.map((menu=>(
            <li>{menu}</li>
          )))}
        </ul>
        <div className="search-box">
            <FontAwesomeIcon icon={faSearch}/>
            <input type="text" placeholder='제품검색' onKeyPress={(event)=>search(event)}/>
        </div>
      </div>
      <div className="search-box2 hide">
            <FontAwesomeIcon icon={faSearch}/>
            <input type="text" placeholder='제품검색' onKeyPress={(event)=>search(event)}/>
        </div>
    </div>
  )
}

export default Navbar
