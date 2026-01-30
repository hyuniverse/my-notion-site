import React from "react";

import { footerText } from "../constants";

const Footer = () => {
    return (
    <footer id="footer" role="contentinfo">
        <div className="footer__inner">
            <div className="footer__info">
                <div className="left">
                    <div className="title">
                        <a href="#">sign up</a>
                    </div>
                    <p>회원가입을 하시면 댓글과 게시판 기능을 이용할 수 있습니다.</p>
                </div>
                <div className="right">
                    <h3>social</h3>
                    <ul>
                        {footerText.map((footer, index) => (
                            <li key={index}>
                                <a href={footer.link}>{footer.title}</a>
                                <em>{footer.desc}</em>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </footer>
    )
}

export default Footer