
/**
 * Copyright © 2019 Elastic Path Software Inc. All rights reserved.
 *
 * This is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this license. If not, see
 *
 *     https://www.gnu.org/licenses/
 *
 *
 */

import * as React from 'react';
// eslint-disable-next-line import/no-cycle
import SubAccountListItem from './SubAccountListItem';

interface SubAccountListProps {
    subAccounts: any,
    getAccountData?: (data: any) => void,
    accountName: string
}


export default class SubAccountList extends React.Component<SubAccountListProps> {
    static defaultProps = {
      getAccountData: () => {
      },
    };

    constructor(props) {
      super(props);

      this.handleAccount = this.handleAccount.bind(this);
    }

    handleAccount(data) {
      const { getAccountData } = this.props;
      getAccountData(data);
    }

    render() {
      const { subAccounts, accountName } = this.props;

      return (
        <div className="sub-accounts-container">
          {subAccounts._element.map(element => (
            <div key={element.name}>
              <SubAccountListItem handleAccount={this.handleAccount} accountData={element} accountName={accountName} />
            </div>
          ))}
        </div>
      );
    }
}
