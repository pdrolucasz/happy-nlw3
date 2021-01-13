import styled from 'styled-components'

export const ButtonConfirm = styled.button`
    margin-top: 64px;
  
    width: 100%;
    height: 64px;
    border: 0;
    cursor: pointer;
    background: #3CDC8C;
    border-radius: 20px;
    color: #FFFFFF;
    font-weight: 800;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: background-color 0.2s;

    &:hover {
        background: #36CF82;
    }
`