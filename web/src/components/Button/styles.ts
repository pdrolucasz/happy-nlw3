import styled, { css } from 'styled-components'

interface ButtonProps {
    refuse?: boolean
}

export const ButtonConfirm = styled.button<ButtonProps>`
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

    ${props => props.refuse && css`
        background: #FF669D;
        &:hover {
            background: #f0598f;
        }
    `}
`