import styled, { css } from 'styled-components'

interface ContainerProps {
    isFilled: boolean
}

export const Container = styled.div<ContainerProps>`
    & + label,
    & + div {
        margin-top: 24px;
    }

    background: #F5F8FA;
    border-radius: 20px;
    border: 1px solid #D3E2E5;
    padding: 16px;
    width: 100%;

    display: flex;
    align-items: center;

    ${props => props.isFilled && css`
        border: 1px solid #37C77F;
    `}

    textarea {
        flex: 1;
        background: transparent;
        border: 0;
        color: #5C8599;
        min-height: 120px;
        max-height: 240px;
        resize: vertical;
        padding: 16px;
        line-height: 28px;
    }
`