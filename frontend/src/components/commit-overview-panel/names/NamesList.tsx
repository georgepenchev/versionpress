/// <reference path='../../common/Commits.d.ts' />

import * as React from 'react';

import renderNames from './renderNames';

interface NamesListProps {
  filteredChanges: Change[];
  countOfDuplicates: CountOfDuplicateChanges;
  expandedLists: string[];
  onShowMoreClick(e: React.MouseEvent, listKey): void;
}

const displayedListLength = 3;

const NamesList: React.StatelessComponent<NamesListProps> = (props) => {
  const {
    filteredChanges,
    countOfDuplicates,
    expandedLists,
    onShowMoreClick,
  } = props;

  const { type, action } = filteredChanges[0];

  const names = renderNames(filteredChanges, countOfDuplicates);

  const listKey = `${type}|||${action}`;

  if (expandedLists.indexOf(listKey) > -1) {
    return (
      <ul>
        {names.map((name, i) => <li key={i}>{name}</li>)}
      </ul>
    );
  }

  return (
    <ul>
      {names.slice(0, displayedListLength).map((name, i) => <li key={i}>{name}</li>)}
      <li>
        <a onClick={e => onShowMoreClick(e, listKey)}>
          show {names.length - displayedListLength} more...
        </a>
      </li>
    </ul>
  );
};

export default NamesList;
