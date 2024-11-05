const searchForm = document.querySelector('.header__search'); // 검색 form 선택자 추가
const searchInput = document.querySelector('.search_txt'); // 검색어 input 필드 선택자 추가

// 현재 표시된 페이지 ID를 저장하는 변수
let currentPage = 'mystudy';

// 페이지를 전환하는 함수
function setNew(pageId) {
    // 모든 페이지 콘텐츠를 숨기기
    document.querySelectorAll('.container > div').forEach(div => {
        div.style.display = 'none';
    });

    // 선택한 페이지 콘텐츠만 보이기
    document.getElementById(pageId).style.display = 'block';

    // 사이드바 메뉴의 활성화 상태를 업데이트
    document.querySelectorAll('.side_bar ul li').forEach(li => {
        li.classList.remove('on');
    });
    document.querySelector(`.side_bar ul li.${pageId}`).classList.add('on');

    // 현재 페이지 상태 업데이트
    currentPage = pageId;
}

// 페이지 로드 시 초기 설정
document.addEventListener("DOMContentLoaded", function() {
    // 초기 페이지 설정
    setNew(currentPage);

    // 사이드바 메뉴 클릭 이벤트 설정
    document.querySelectorAll('.side_bar ul li').forEach(li => {
        li.addEventListener('click', function() {
            const pageId = this.classList[0];
            setNew(pageId);
        });
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

