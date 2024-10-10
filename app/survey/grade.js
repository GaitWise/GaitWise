import * as React from "react";
import { useState } from "react";
import styled from "styled-components/native";
import { pagesData } from "../survey/data"; // 모든 페이지 데이터 가져오기
import Main from "../../components/common/main"; // 고정된 Grade 컴포넌트

const Grade = () => {
  const [currentPageId, setCurrentPageId] = useState("grade"); // 초기 페이지 ID는 'grade'

  // 현재 페이지 데이터 가져오기
  const currentPageData = pagesData.find((page) => page.id === currentPageId);

  // 다음 페이지로 이동하는 함수
  const goToNextPage = () => {
    if (currentPageData.nextPage) {
      setCurrentPageId(currentPageData.nextPage); // 다음 페이지로 변경
    } else {
      console.log("마지막 페이지입니다.");
    }
  };

  return (
    <BaseFrameContainer>
      {/* Grade 컴포넌트에 현재 페이지 데이터와 다음 페이지로 넘어가는 함수 전달 */}
      <Main pagesData={currentPageData} onNextPage={goToNextPage} />
    </BaseFrameContainer>
  );
};

// styled-components
const BaseFrameContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;
export default Grade;
