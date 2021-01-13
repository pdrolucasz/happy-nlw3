import styled, { css } from 'styled-components'

interface ContainerProps {
    isFilled: boolean
}

export const Container = styled.div<ContainerProps>`
    margin-top: 24px;

    label {
        display: flex;
        color: #8FA7B3;
        margin-bottom: 8px;
        line-height: 24px;
    }

    input {
        width: 100%;
        background: #F5F8FA;
        border: 1px solid #D3E2E5;
        border-radius: 20px;
        outline: none;
        color: #5C8599;
        height: 64px;
        padding: 0 16px;

        ${props => props.isFilled && css`
            border: 1px solid #37C77F;
        `}
    }
`