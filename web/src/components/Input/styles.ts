import styled, { css } from 'styled-components'

import Tooltip from '../Tooltip'

interface ContainerProps {
    isFilled: boolean
    isErrored: boolean
}

export const Container = styled.div<ContainerProps>`
    margin-top: 24px;

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
    ${props => props.isErrored && css`
        border-color: #c53030;
    `}
    
    input {
        flex: 1;
        background: transparent;
        border: 0;
        color: #5C8599;
    }
`

export const Error = styled(Tooltip)`
    height: 20px;
    margin-left: 16px;
    
    svg {
        margin: 0;
    }
    span {
        background: #c53030;
        color: #fff;
        &::before {
            border-color:#c53030 transparent;
        }
    }
`