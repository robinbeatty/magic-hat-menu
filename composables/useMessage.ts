// Only files at the top level of the composables/ directory 
// (or index files within any subdirectories) will be scanned for composables.

import { useState } from '#app'
import { type UseMessage } from '~/assets/common/types/utility'
export const useMessage = () => useState<UseMessage>('message', () => {
    return null
})
