import * as React from 'react'

import { StatusBar as _StatusBar } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

export default props => useIsFocused() ? <_StatusBar {...props} /> : null