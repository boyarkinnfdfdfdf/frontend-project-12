import AddChannelModal from './AddChannel.jsx'
import RenameChannelModal from './RenameChannel.jsx'
import RemoveChannelModal from './RemoveChannel.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { hideAddModal, hideRenameModal, hideRemoveModal } from '../store/modalsSlice.js'

const ModalFacade = () => {
  const dispatch = useDispatch()
  const { isAddModalOpen, isRenameModalOpen, isRemoveModalOpen, channelToEdit } = useSelector((state) => state.modals)

  if (isAddModalOpen) {
    return (
      <AddChannelModal
        show
        handleClose={() => dispatch(hideAddModal())}
      />
    )
  }

  if (isRenameModalOpen) {
    return (
      <RenameChannelModal
        show
        handleClose={() => dispatch(hideRenameModal())}
        channel={channelToEdit}
      />
    )
  }

  if (isRemoveModalOpen) {
    return (
      <RemoveChannelModal
        show
        handleClose={() => dispatch(hideRemoveModal())}
        channel={channelToEdit}
      />
    )
  }

  return null
}

export default ModalFacade
