import textContent from '@/services/textContent'
import api from '@/services/api'

import store from '../store'

export default {
  setTextContent() {
    Object.keys(textContent.textContent).forEach((id) => {
      document.getElementById(id).addEventListener('click', async () => {
        const selectedId = store.state.sectorList.find(sector => sector.coords === id).id;
        const selectedSector = await api.getSector(selectedId)
        await store.dispatch('changeselectedSector', selectedSector)
        await store.dispatch('changeMarkdown', selectedSector.description)
        await store.dispatch('changeTitle', textContent.textContent[id].name)
        
      })
    })
  },
  clearModalContent(){
    store.dispatch('changeselectedSector', null)
    store.dispatch('changeMarkdown', null)
    store.dispatch('changeTitle', null)
  }
}