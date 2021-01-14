import styled, { css } from 'styled-components'

interface SidebarProps {
    approve?: boolean
    approved?: boolean
}

export const Container = styled.aside<SidebarProps>`
    position: fixed;
    height: 100%;
    padding: 32px 24px;
    background: linear-gradient(329.54deg, #15B6D6 0%, #15D6D6 100%);
  
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    img {
        width: 48px;
    }

    nav {
        display: flex;
        flex-direction: column;

        a {
            margin-bottom: 15px;
            width: 48px;
            height: 48px;
        
            border: 0;
        
            background: #12AFCB;
            border-radius: 16px;
            
            transition: background-color 0.2s;
            
            display: flex;
            justify-content: center;
            align-items: center;
        }

        a.approve {
            ${props => props.approve && css`
                background: #FFD666;
            `}
        }

        a.approved {
            ${props => props.approved && css`
                background: #FFD666;
            `}
        }
    }

    footer a,
    footer button {
        width: 48px;
        height: 48px;
    
        border: 0;
    
        background: #12AFCB;
        border-radius: 16px;
        
        transition: background-color 0.2s;
        
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            background: #17D6EB;
        }
    }
`