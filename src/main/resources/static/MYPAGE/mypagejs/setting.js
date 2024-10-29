document.addEventListener("DOMContentLoaded", function() {
    const settingContainer = document.getElementById('setting');

    settingContainer.innerHTML = `
        <!-- 회원정보 변경 섹션 -->
        <div class="setting-section">
            <h3> 비밀번호 변경</h3>
            <div class="setting-container">
                <div class="password-confirmation">
                    <h4>기존 비밀번호를 입력해 주세요.</h4>
                    <input type="password" id="exPassword" placeholder="비밀번호 입력">
                    <h4>새로운 비밀번호를 입력해 주세요.</h4>
                    <input type="password" id="newPassword1" placeholder="비밀번호 입력">
                    <input type="password" id="newPassword2" placeholder="비밀번호 확인">
                    <button class="password-confirm-btn">확인</button>
                </div>
            </div>
        </div>

        <!-- 맞춤형 설정 섹션 -->
        <div class="setting-section">
            <h3>맞춤형 설정</h3>
            <div class="setting-container">
                <div class="container-select" id="select__category">
                    <h4>학습을 원하는 카테고리를 모두 골라주세요.</h4>
                    <div class="content">
                        <section>
                            <input type='checkbox' id='HOBBY' /><label for='HOBBY' class="category-btn">취미생활</label>
                            <input type='checkbox' id='BUSINESS' /><label for='BUSINESS' class="category-btn">비즈니스</label>
                            <input type='checkbox' id='TRAVEL' /><label for='TRAVEL' class="category-btn">해외여행</label>
                            <input type='checkbox' id='DAILY' /><label for='DAILY' class="category-btn">일상생활</label>
                            <input type='checkbox' id='SHOPPING' /><label for='SHOPPING' class="category-btn">쇼핑</label>
                        </section>
                    </div>
                </div>
                <div class="container-select" id="select__level">
                    <h4>학습을 원하는 레벨을 골라주세요.</h4>
                    <div class="content">
                        <section>
                            <input type='radio' name='level' id='high' /><label for='high' class="level-btn">상</label>
                            <input type='radio' name='level' id='medium' /><label for='medium' class="level-btn">중</label>
                            <input type='radio' name='level' id='low' /><label for='low' class="level-btn">하</label>
                        </section>
                    </div>
                </div>
                <button id="submit">저장하기</button>
            </div>
        </div>
    `;

    document.querySelector('.password-confirm-btn').addEventListener('click', async () => {
        const exPassword = document.getElementById('exPassword').value;
        const newPassword1 = document.getElementById('newPassword1').value;
        const newPassword2 = document.getElementById('newPassword2').value;

        if (exPassword && newPassword1 && newPassword2) {
            const payload = {
                    exPassword: exPassword,
                    newPassword1: newPassword1,
                    newPassword2: newPassword2
                    };
            try {
                    const response = await fetch('/update/password', {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });

                    if (response.ok) {
                        alert(`변경되었습니다.`);
                        } else {
                            console.error('Error updating password:', response.status);
                    }

                } catch (error) {
                    console.error('Error updating password:', error);
                }
        } else {
            alert("비밀번호를 입력해주세요.");
        }
    });
    


    // 체크박스와 라디오 버튼에 대한 이벤트 리스너
    document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(input => {
        input.addEventListener('change', (event) => {
            const label = document.querySelector(`label[for="${input.id}"]`);

            if (input.type === 'checkbox') {
                if (input.checked) {
                    label.classList.add('active');
                } else {
                    label.classList.remove('active');
                }
            } else if (input.type === 'radio') {
                document.querySelectorAll('input[type="radio"] + label').forEach(l => l.classList.remove('active'));
                label.classList.add('active');
            }
        });
    });

    // 저장 버튼 클릭 시 선택된 카테고리와 레벨 검증
    document.getElementById('submit').addEventListener('click', async () => {
                const selectedCategories = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
                                        .map(checkbox => checkbox.id);

        const selectedLevel = document.querySelector('input[type="radio"]:checked')?.id || '';

        if (selectedCategories.length === 0) {
            alert("카테고리를 하나 이상 선택해주세요.");
            return;
        }

        if (!selectedLevel) {
                    alert('레벨을 선택해주세요.');
                    return;
                }
         let levelNumber;
                 switch (selectedLevel) {
                     case 'high':
                         levelNumber = 3;
                         break;
                     case 'medium':
                         levelNumber = 2;
                         break;
                     case 'low':
                         levelNumber = 1;
                         break;
                     default:
                         alert('올바른 레벨을 선택해주세요.');
                         return;
                 }
        const payload2 = {
            level: levelNumber,
            category: selectedCategories
        };
        try {
            const response = await fetch('/user-info', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload2)
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data from server');
            }

            const data = await response.json();

        } catch (error) {
            console.error('Error updating password:', error);
        }
        alert(`업데이트 되었습니다.`);
    });

});
