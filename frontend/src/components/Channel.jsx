import { ButtonGroup, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectCurrentChannelId, setCurrentChannelId } from '../store/currentChannelSlice.js';
import { showRenameModal, showRemoveModal } from '../store/modalsSlice.js';

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentChannelId = useSelector(selectCurrentChannelId);

  const isActive = channel.id === currentChannelId;
  const variant = isActive ? 'btn-secondary' : '';
  const dropdownVariant = isActive ? 'secondary' : 'light';

  const handleChannelClick = () => {
    dispatch(setCurrentChannelId(channel.id));
  };

  return (
    <li className="nav-item w-100">
      <div className="btn-group dropdown d-flex">
        <button
          type="button"
          className={`w-100 rounded-0 text-start btn ${variant}`}
          onClick={handleChannelClick}
        >
          <span className="me-1">#</span>
          {channel.name}
        </button>
        {channel.removable && (
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              split
              variant={dropdownVariant}
              id={`dropdown-${channel.id}`}
            >
              <span className="visually-hidden">{t('chat.channelManagement')}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => dispatch(showRenameModal(channel))}>
                {t('chat.renameChannel')}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => dispatch(showRemoveModal(channel))}>
                {t('chat.removeChannel')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </li>
  );
};

export default Channel;
