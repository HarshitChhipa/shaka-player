/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

goog.provide('shaka.test.OfflineUtils');


/**
 * @param {string} originalUri
 * @return {shakaExtern.ManifestDB}
 */
shaka.test.OfflineUtils.createManifest = function(originalUri) {
  return {
    appMetadata: null,
    drmInfo: null,
    duration: 90,
    expiration: Infinity,
    originalManifestUri: originalUri,
    periods: [],
    sessionIds: [],
    size: 1024
  };
};


/**
 * @param {number} id
 * @param {string} type
 * @return {shakaExtern.StreamDB}
 */
shaka.test.OfflineUtils.createStream = function(id, type) {
  return {
    id: id,
    primary: false,
    presentationTimeOffset: 0,
    contentType: type,
    mimeType: '',
    codecs: '',
    frameRate: undefined,
    kind: undefined,
    language: '',
    label: null,
    width: null,
    height: null,
    initSegmentKey: null,
    encrypted: false,
    keyId: null,
    segments: [],
    variantIds: []
  };
};


/**
 * @param {!Array.<number>} data
 * @return {shakaExtern.SegmentDataDB}
 */
shaka.test.OfflineUtils.createSegmentData = function(data) {
  /** @type {Uint8Array} */
  var array = new Uint8Array(data);

  return {
    data: array.buffer
  };
};


/**
 * @param {!Array.<shakaExtern.SegmentDataDB>} segments
 * @param {shakaExtern.SegmentDataDB} expected
 */
shaka.test.OfflineUtils.expectSegmentsToContain = function(segments,
                                                           expected) {
  var actualData = segments.map(function(segment) {
    expect(segment.data).toBeTruthy();
    return new Uint8Array(segment.data);
  });

  expect(expected.data).toBeTruthy();
  var expectedData = new Uint8Array(expected.data);

  expect(actualData).toContain(expectedData);
};


/**
 * @param {shakaExtern.SegmentDataDB} actual
 * @param {shakaExtern.SegmentDataDB} expected
 */
shaka.test.OfflineUtils.expectSegmentToEqual = function(actual, expected) {
  expect(actual.data).toBeTruthy();
  expect(expected.data).toBeTruthy();

  var actualData = new Uint8Array(actual.data);
  var expectedData = new Uint8Array(expected.data);

  expect(actualData).toEqual(expectedData);
};