import React from 'react';
import Board from './board';
import { EMPTY } from './links';
import { CellState } from '../../lib/dropchain/types';
import Cell from './cell';

const InstructionsModal = ({ open, setOpen }) => {
  return open ? (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* <!--
      Background backdrop, show/hide based on modal state.
  
      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    --> */}
      <div className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex  min-h-full items-center justify-center p-4 sm:items-center sm:p-0">
          {/* <!--
          Modal panel, show/hide based on modal state.
  
          Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        --> */}
          <div className="relative transform overflow-hidden border-4 border-double border-green-500 bg-slate-900 text-left  transition-all sm:my-8 sm:w-full sm:max-w-3xl">
            <div className="pb-4 pt-5 sm:p-3 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="font-mono text-base font-semibold leading-6 text-green-500"
                    id="modal-title"
                  >
                    INSTRUCTIONS
                  </h3>
                  <p className="my-3 font-mono text-green-500">
                    To score: form chains of links and then break the links. A
                    link will break if the number inside of the link matches the
                    length of the chain it is a part of.
                  </p>
                  {/* Examples */}
                  <div className="grid grid-cols-2 grid-rows-2 gap-2">
                    <div className="border border-dashed border-green-500 p-4">
                      <p className="pb-2 font-mono text-sm text-green-500">
                        This is a chain of two links. The length is 2. So, the link with (2) inside scores.
                      </p>
                      <div
                        className={`m-auto grid w-14 grid-cols-1 border-4 border-b-4 border-double border-green-600`}
                      >
                        {[
                          [
                            [2, CellState.Clear],
                            [4, CellState.Clear],
                          ],
                        ].map((row, i) =>
                          row.map((cell, x) => {
                            return (
                              <Cell
                                key={x}
                                cell={cell}
                                fill={cell[0]}
                                stagingRow={false}
                              />
                            );
                          })
                        )}
                      </div>
                    </div>
                    <div className="border border-dashed border-green-500 p-4">
                      <p className="pb-2 font-mono text-sm text-green-500">
                        This is a chain of 3. Link(3) scores, (5) and (6) do not. 
                      </p>
                      <div
                        className={`m-auto w-44 grid  grid-cols-3 border-4 border-b-4 border-double border-green-600`}
                      >
                        {[
                          [
                            [5, CellState.Clear],
                            [3, CellState.Clear],
                            [6, CellState.Clear],
                          ],
                        ].map((row, i) =>
                          row.map((cell, x) => {
                            return (
                              <Cell
                                key={x}
                                cell={cell}
                                fill={cell[0]}
                                stagingRow={false}
                              />
                            );
                          })
                        )}
                      </div>
                    </div>

                    <div className="border border-dashed border-green-500 p-4">
                      <p className="pb-2 font-mono text-sm text-green-500">
                        4 different chains of length 2 are formed. No scores.
                      </p>
                      <div
                        className={`m-auto grid w-28 grid-cols-2 border-4 border-b-4 border-double border-green-600`}
                      >
                        {[
                          [
                            [1, CellState.Clear],
                            [4, CellState.Clear],
                            [3, CellState.Clear],
                            [6, CellState.Clear],
                          ],
                        ].map((row, i) =>
                          row.map((cell, x) => {
                            return (
                              <Cell
                                key={x}
                                cell={cell}
                                fill={cell[0]}
                                stagingRow={false}
                              />
                            );
                          })
                        )}
                      </div>
                    </div>
                    <div className="border border-dashed border-green-500 p-4">
                      <p className="pb-2 font-mono text-sm text-green-500">
                        Link(3) scores. Then, it unlocks link(0), turning it into a
                        random breakable link.
                      </p>
                      <div
                        className={`m-auto grid w-14 grid-cols-1 border-4 border-b-4 border-double border-green-600`}
                      >
                        {[
                          [
                            [5, CellState.Clear],
                            [3, CellState.Clear],
                            [8, CellState.Clear],
                          ],
                        ].map((row, i) =>
                          row.map((cell, x) => {
                            return (
                              <Cell
                                key={x}
                                cell={cell}
                                fill={cell[0]}
                                stagingRow={false}
                              />
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center border-2 border-green-500 px-3 py-2 font-mono text-sm font-semibold  text-green-500 hover:border-2 hover:border-double sm:mt-0 sm:w-auto"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default InstructionsModal;
