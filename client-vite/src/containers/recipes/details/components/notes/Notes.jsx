import React from 'react';
import { observer } from 'mobx-react';
import BlockHeader from '../BlockHeader.jsx';
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from '@components';
import { authStore } from '@store';
import { FormattedMessage } from 'react-intl';
import { dateFormatter } from '@shared';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Notes = observer(({uiState}) => {
  const {notes} = uiState;

  if (!authStore.isLoggedIn) return null;

  return (
    <React.Fragment>
      <BlockHeader title={'recipes.Notes'}/>
      <div className='relative w-full bg-white drop-shadow-md border-powder border p-2'>
        <TextareaAutosize
          value={notes.body}
          onChange={(e) => uiState.updateNotesBody(e.target.value)}
          placeholder='Add a note...'
          className='outline-none resize-none w-full placeholder:text-silver'
          minRows={3}
        />
        <div className={`flex ${notes.isNew ? 'justify-end' : 'justify-between'}`}>
          {!notes.isNew && <div className='flex text-silver text-xs items-end'>
            <FormattedMessage id='recipes.notes.NOTES_UPDATED' values={{date: dateFormatter(notes.updatedAt)}}/>
          </div>}
          {uiState.notesEdited && <div className='w-1/4'>
            <Button trait='primary' onClick={() => uiState.saveNotes()}>
              <FormattedMessage id='recipes.notes.Save'/>
            </Button>
          </div>}
        </div>
        {!notes.isNew && <div className='absolute text-silver right-2 top-1 cursor-pointer' onClick={() => uiState.deleteNotes()}>
          <FontAwesomeIcon icon='fa-solid fa-trash'/>
        </div>}
      </div>
    </React.Fragment>
  );
});

export default Notes;
