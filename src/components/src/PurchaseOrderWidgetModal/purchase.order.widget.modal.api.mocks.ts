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
import fetchMock from 'fetch-mock/es5/client';
import fetchPaymentOrderDataResponse from './MockHttpResponses/GET/fetch_payment_order_data_response.json';
import fetchPaymentOrderDataNoPOResponse from './MockHttpResponses/GET/fetch_payment_order_data_no_po_response.json';
import poPaymentCreationSuccess from './MockHttpResponses/POST/po_payment_creation_success.json';
import nameMustNotBeBlankError from './MockHttpResponses/POST/name_must_not_be_blank_error.json';
import poMustNotBeBlankError from './MockHttpResponses/POST/po_must_not_be_blank_error.json';
import { mockAnonLoginResponse, mockRegisteredLoginResponse } from '../utils/MockLogins';


function mockFetchPostToCreatePoPaymentInstrumentSuccess(mockObj) {
  mockObj.post(
    /(.*)\/cortex\/paymentinstruments\/paymentmethods\/(orders|profiles)\/(.*)\/form/,
    poPaymentCreationSuccess,
    {
      status: 200,
      delay: 1000, // fake a slow network
    },
  );
}

function mockPaymentInstrumentFormActionFailure(mockObj) {
  mockObj.post(
    /(.*)\/cortex\/paymentinstruments\/paymentmethods\/(orders|profiles)\/(.*)\/form/,
    nameMustNotBeBlankError,
    {
      delay: 1000, // fake a slow network
    },
  );
}

function mockPaymentInstrumentFormActionPOFailure(mockObj) {
  mockObj.post(
    /(.*)\/cortex\/paymentinstruments\/paymentmethods\/(orders|profiles)\/(.*)\/form/,
    poMustNotBeBlankError,
    {
      delay: 1000, // fake a slow network
    },
  );
}

export function mockPostToCreatePOPaymentInstrumentWithAnonUser() {
  fetchMock.restore();
  mockAnonLoginResponse(fetchMock);
  mockFetchPostToCreatePoPaymentInstrumentSuccess(fetchMock);
}

export function mockPaymentFormBlankPOFailureWithAnonUser() {
  fetchMock.restore();
  mockAnonLoginResponse(fetchMock);
  mockPaymentInstrumentFormActionPOFailure(fetchMock);
}

export function mockPaymentFormBlankDisplayFailureWithAnonUser() {
  fetchMock.restore();
  mockAnonLoginResponse(fetchMock);
  mockPaymentInstrumentFormActionFailure(fetchMock);
}
