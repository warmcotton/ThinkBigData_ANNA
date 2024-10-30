document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const searchForm = document.querySelector('.header__search'); // 검색 form 선택자 추가
    const searchInput = document.querySelector('.search_txt'); // 검색어 input 필드 선택자 추가
    const links = {
        studyLink: document.getElementById('studyLink'),
        mypageLink: document.getElementById('mypageLink'),
        footerStudyLink: document.getElementById('footerStudyLink'),
        footerMypageLink: document.getElementById('footerMypageLink'),
    };

    // 로그인 여부 확인 (access 토큰 존재 여부로 판단)
    function checkLoginStatus() {
        return !!localStorage.getItem('accessToken');
    }

    // 로그인 상태에 따른 버튼 및 링크 설정 함수
    function updateUI(isLoggedIn) {
        if (isLoggedIn) {
            // 로그인 되어 있는 상태
            loginButton.textContent = '로그아웃';
            loginButton.href = '#';
            loginButton.onclick = (e) => {
                e.preventDefault();
                handleLogout();
            };
            signupButton.style.display = 'none';

            // 링크들을 실제 페이지로 이동하도록 설정
            Object.keys(links).forEach(link => {
                links[link].href = getActualLink(link);
            });
        } else {
            // 로그인 되어 있지 않은 상태
            loginButton.textContent = '로그인';
            loginButton.href = '/JOIN/signin.html';
            loginButton.onclick = null;
            signupButton.style.display = 'inline-block';

            // 링크들을 로그인 필요하도록 설정
            Object.values(links).forEach(link => {
                link.href = 'javascript:alert("로그인을 먼저 해주세요.");';
            });
        }
    }

    // 실제 페이지 링크 반환 함수
    function getActualLink(linkId) {
        switch (linkId) {
            case 'studyLink':
            case 'footerStudyLink':
                return '/STUDY/study.html';
            case 'mypageLink':
            case 'footerMypageLink':
                return '/MYPAGE/mypage.html';
            default:
                return '#';
        }
    }

    // 로그아웃 처리 함수
    function handleLogout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        updateUI(false);
    }

    // 초기 로그인 상태 확인 후 UI 업데이트
    updateUI(checkLoginStatus());

    // 로그인 버튼 클릭 시 로그인/로그아웃 처리
    loginButton.addEventListener('click', (e) => {
        e.preventDefault(); // 기본 동작 방지
        const isLoggedIn = checkLoginStatus();
        if (isLoggedIn) {
            handleLogout();
        } else {
            window.location.href = '/JOIN/signin.html';
        }
    });

    // 검색어 입력 후 Cambridge 사전 검색으로 이동
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault(); // 기본 form 제출 방지
        const query = searchInput.value.trim(); // 검색어 가져오기
        if (query) {
            // Cambridge 사전 검색 페이지를 새 창에서 열기
            window.open(`https://dictionary.cambridge.org/ko/%EC%82%AC%EC%A0%84/%EC%98%81%EC%96%B4-%ED%95%9C%EA%B5%AD%EC%96%B4/${encodeURIComponent(query)}`, '_blank');
        } else {
            alert("검색어를 입력하세요."); // 검색어가 없을 때 경고
        }
    });
});
