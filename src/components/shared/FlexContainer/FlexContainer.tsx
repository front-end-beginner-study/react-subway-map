import styled from "styled-components";

export const Flex = styled.div`
  display: flex;
`;

export const FlexJustfiyCenter = styled(Flex)`
  justify-content: center;
`;

export const FlexAlignCenter = styled(Flex)`
  align-items: center;
`;

export const FlexCenter = styled(Flex)`
  justify-content: center;
  align-items: center;
`;

export const FlexColumn = styled(Flex)`
  flex-direction: column;
`;

export const FlexColumnJustfiyCenter = styled(FlexJustfiyCenter)`
  flex-direction: column;
`;

export const FlexColumnAlignCenter = styled(FlexAlignCenter)`
  flex-direction: column;
`;
