import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { selectAllChannels } from '../store/channelsSlice.js'
import { showAddModal } from '../store/modalsSlice.js'
import addIcon from '../assets/add.svg'
import Channel from './Channel.jsx'

const Channels = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const channels = useSelector(selectAllChannels)

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channelsTitle')}</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={() => dispatch(showAddModal())}
        >
          <img src={addIcon} alt="Add" width={20} height={20} />
          <span className="visually-hidden">+</span>
        </button>
      </div>

      <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block" id="channels-box">
        {channels.map((channel) => (
          <Channel key={channel.id} channel={channel} />
        ))}
      </ul>
    </div>
  )
}

export default Channels
