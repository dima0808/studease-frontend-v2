import Lockup from '@/components/Lockup';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import './SidebarCreate.scss';
import ToggleButton from '@/layout/Sidebar/ToggleButton';
import {
  ArrowLeft,
  PlusCircle,
  FolderOpen,
  Bot,
  CheckCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useActions } from '@/hooks/useActions';

const SidebarCreate = ({
  addQuestion,
  addCollection,
  showAIGenerationBlock,
  isTest,
}) => {
  const { isCollapsed } = useSelector((state) => state.filter);
  const { setIsCollapsed } = useActions();
  const { t } = useTranslation();

  const navigate = useNavigate();

  return (
    <aside
      className={classNames('sidebar-create', {
        'sidebar-create--collapsed': isCollapsed,
      })}
    >
      <Lockup className="sidebar-create__title" />

      <nav className="sidebar-create__nav">
        <div className="sidebar-create__nav-main">
          <button
            title={isCollapsed ? t('sidebarCreate.addQuestion') : undefined}
            className="sidebar-create__button"
            onClick={addQuestion}
          >
            <PlusCircle className="sidebar-create__button__icon" size={20} />
            {!isCollapsed && (
              <Motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                {t('sidebarCreate.addQuestion')}
              </Motion.span>
            )}
          </button>

          {isTest && (
            <button
              title={
                isCollapsed ? t('sidebarCreate.addCollection') : undefined
              }
              className="sidebar-create__button"
              onClick={addCollection}
            >
              <FolderOpen className="sidebar-create__button__icon" size={20} />
              {!isCollapsed && (
                <Motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  {t('sidebarCreate.addCollection')}
                </Motion.span>
              )}
            </button>
          )}

          <button
            title={isCollapsed ? t('sidebarCreate.aiGenerate') : undefined}
            className="sidebar-create__button"
            onClick={showAIGenerationBlock}
          >
            <Bot className="sidebar-create__button__icon" size={20} />
            {!isCollapsed && (
              <Motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                {t('sidebarCreate.aiGenerate')}
              </Motion.span>
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {!isCollapsed && (
          <Motion.div
            key="extra-space"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18, transition: { duration: 0.1 } }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <p className="sidebar-create__hint">{t('sidebarCreate.hint')}</p>
          </Motion.div>
        )}
      </AnimatePresence>

      <div className="sidebar-create__actions">
        {/*{
        <button title="Create" className="sidebar-create__button sidebar-create__button--primary" onClick={onCreate}>
          <CheckCircle  className="sidebar-create__button__icon" size={20} />
          {!isCollapsed && (
            <Motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {isTest ? 'Create Test' : 'Create Collection'}
            </Motion.span>
          )}
        </button>
        }*/}
        <button
          title={isCollapsed ? t('common.back') : undefined}
          className="sidebar-create__button sidebar-create__button--back"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="sidebar-create__button__icon" size={20} />
          {!isCollapsed && (
            <Motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {t('common.back')}
            </Motion.span>
          )}
        </button>
        <ToggleButton
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>
    </aside>
  );
};

export default SidebarCreate;
