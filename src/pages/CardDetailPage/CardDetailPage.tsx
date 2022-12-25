import React, { Fragment, useEffect, useRef, useState } from 'react';
import css from './CardDetailPage.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SideBar from '../../components/SideBar/SideBar';
import Comment from '../../components/Comment/Comment';
import { Link, useParams } from 'react-router-dom';

export interface FieldType {
  id: number;
  main_field: string;
}

interface CompanyInfoType {
  branch_name: string;
  category: string;
  category_id: number;
  company_name: string;
  contact: string;
  detail_introduction: string;
  feed_id: number;
  field_name: FieldType;
  file_link: string;
  file_name: string;
  group_id: number;
  introduction: string;
  logo_img: string;
  member_benefit: string;
  parent_category: string | null;
  parent_category_id: number | null;
  updated_at: string;
  user_title: string;
  website_url: string;
  user_id: number;
}

const CardDetailPage = () => {
  const URI = process.env.REACT_APP_BACK_URL;
  const PORT = process.env.REACT_APP_BACK_DEFAULT_PORT;
  const [isModalOn, setIsModalOn] = useState(false);
  const [email, setEmail] = useState('');
  const [postInfo, setPostInfo] = useState<CompanyInfoType>();
  const [fieldList, setFieldList] = useState<FieldType[]>([]);
  const [writerId, setWriterId] = useState(0);
  let token: string | null = localStorage.getItem('token');
  let loginId: string | null = localStorage.getItem('id');
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  if (token) {
    requestHeaders.set('Authorization', token);
  }
  const params = useParams();
  let postId = params.id;

  useEffect(() => {
    fetch(`http://` + URI + `:` + PORT + `/feedlist/${postId}`, {
      method: 'GET',
      headers: requestHeaders,
    })
      .then(response => response.json())
      .then(json => {
        setPostInfo(json);
        setFieldList(json.field_name);
        setWriterId(json.user_id);
        setEmail(json.contact);
      });
  }, []);

  //navigator.clipboard는 localhost 또는 https환경에서만 작동
  const copyEmailInhttps = () => {
    setIsModalOn(true);
    navigator.clipboard.writeText(email).then(() => {
      setTimeout(function () {
        setIsModalOn(false);
      }, 1000);
    });
  };

  //http 환경에서도 작동하는 copyEmail 함수
  //배포 시 사용합니다.
  const copyEmailInhttp = () => {
    const textArea = document.createElement('textarea');
    document.body.appendChild(textArea);
    textArea.value = email;
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setIsModalOn(true);
    if (document.execCommand('copy')) {
      setTimeout(function () {
        setIsModalOn(false);
      }, 1000);
    }
  };

  //삭제 기능 구현
  const doDelete = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      fetch('http://' + URI + ':' + PORT + '/feed/posting', {
        method: 'DELETE',
        headers: requestHeaders,
        body: JSON.stringify({
          feed_id: postId,
        }),
      })
        .then(response => response.json())
        .then(json => {
          if (json.message.includes('DELETED')) {
            alert('삭제되었습니다.');
            window.location.href = '/';
          } else if (json.message.includes('GROUP_ADMIN_ONLY')) {
            alert('권한이 없습니다.');
          } else {
            alert('다시 시도해주세요.');
          }
        });
    } else {
      alert('취소되었습니다.');
    }
  };
  let arr: any = [];

  return (
    <Fragment>
      <Header />
      <main className={css.mainContainer}>
        <SideBar />
        <div className={css.container}>
          {isModalOn && (
            <div className={css.modalBg}>
              <div className={css.modalMain}>
                <p className={css.copyMessage}>복사되었습니다.</p>
              </div>
            </div>
          )}
          <div className={css.main}>
            <div className={`${css.content} ${css.gridContainer}`}>
              <div className={`${css.gridItem} ${css.category}`}>
                <Link to="/list">{postInfo?.category}</Link>
              </div>
              {writerId === Number(loginId) ? (
                <div className={`${css.gridItem} ${css.crudBtns}`}>
                  <span className={css.modify}>
                    <Link to="/postWritePage" state={{ type: 'modify' }}>
                      수정
                    </Link>
                  </span>
                  <span className={css.centerBar} />
                  <span className={css.delete} onClick={doDelete}>
                    삭제
                  </span>
                </div>
              ) : (
                <div></div>
              )}
              <div className={`${css.gridItem} ${css.logo}`}>
                <img
                  className={css.logoImg}
                  src={postInfo?.logo_img}
                  alt={postInfo?.company_name + '로고'}
                />
              </div>
              <div
                className={`${css.gridItem} ${css.title} ${css.companyName}`}
              >
                <p>{postInfo?.company_name}</p>
              </div>
              <div className={`${css.gridItem} ${css.infoContent}`}>
                <p>{postInfo?.introduction}</p>
              </div>
              <div className={`${css.gridItem} ${css.title}`}>
                <p>업무분야</p>
              </div>
              <div className={css.gridItem}>
                <p>
                  {fieldList.map(field => {
                    arr.push(field.main_field);
                    return <span key={field.id}>{arr.join(', ')}</span>;
                  })}
                </p>
              </div>
              <div className={`${css.gridItem} ${css.title}`}>
                <p>멤버 혜택</p>
              </div>
              <div className={css.gridItem}>
                <p>{postInfo?.member_benefit}</p>
              </div>
              <div className={`${css.gridItem} ${css.title}`}>
                <p>홈페이지</p>
              </div>
              <div className={css.gridItem}>
                <p className={css.contactInfo}>
                  <a
                    href={postInfo?.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {postInfo?.website_url}
                  </a>
                </p>
                <span className={css.alertMessage}>
                  주소를 클릭하면 페이지로 이동합니다.
                </span>
              </div>
              <div className={`${css.gridItem} ${css.title}`}>
                <p>연락처</p>
              </div>
              <div className={css.gridItem}>
                <p className={css.contactInfo}>
                  <span
                    className={
                      postInfo?.contact.includes('.')
                        ? css.copyEmail
                        : css.contact
                    }
                    onClick={
                      postInfo?.contact.includes('.')
                        ? copyEmailInhttp
                        : undefined
                    }
                  >
                    {postInfo?.contact}
                  </span>
                  ({postInfo?.user_title})
                </p>
                {postInfo?.contact.includes('.') && (
                  <span className={css.alertMessage}>
                    이메일을 클릭하면 복사됩니다.
                  </span>
                )}
              </div>
              <div className={`${css.gridItem} ${css.infoContent}`}>
                <p>{postInfo?.detail_introduction}</p>
              </div>
              <div className={`${css.gridItem} ${css.title}`}>
                <p>회사 소개서</p>
              </div>
              <div className={css.gridItem}>
                <p className={css.contactInfo}>
                  <a href={postInfo?.file_link}>{postInfo?.file_name}</a>
                </p>
                <span className={css.alertMessage}>
                  파일 명을 클릭하면 다운로드 받을 수 있습니다.
                </span>
              </div>
            </div>
          </div>
          <Comment />
        </div>
      </main>
      <Footer />
    </Fragment>
  );
};

export default CardDetailPage;
