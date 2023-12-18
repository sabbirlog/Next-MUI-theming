import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@/styles/GlobalsStyles';
import { PaletteMode } from '@mui/material';
import { createContext, SetStateAction, useMemo, useState } from 'react';
import palette from '@/theme/palette/index';
import { ColorModeContext } from '@/contexts/ColorModeContext';

const DEFAULT_COLOR_MODE: PaletteMode = 'dark';

const ThemeContextProvider = ({ children }: {
    children: React.ReactNode
}) => {
    const [mode, setMode] = useState(DEFAULT_COLOR_MODE);

    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
            setMode((prevMode: SetStateAction<PaletteMode>) => prevMode === 'dark' ? 'light' : 'dark')
        }
    }), [])

    // control and create theme
    const theme = useMemo(
        () =>
            createTheme({
                mode: palette(mode)
            })
        , [mode])

    return (
        <StyledEngineProvider injectFirst>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <GlobalStyles />
                    <div>{children}</div>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </StyledEngineProvider>
    )
}

export default ThemeContextProvider