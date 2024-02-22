sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project1.controller.View1", {
            onInit: function () {
                // Original code
                this.originalCode = `
                *&---------------------------------------------------------------------*
                *& Report  ZAPLX_TRAINING_ADOBE
                *&
                *&---------------------------------------------------------------------*
                *&
                *&
                *&---------------------------------------------------------------------*

                REPORT zaplx_training_adobe.
                DATA : fm_name           TYPE rs38l_fnam,
                    fp_outputparams TYPE sfpoutputparams,
                    im_print TYPE /aplx/seif_exp_doc,
                    fp_docparams TYPE sfpdocparams,
                    lt_it TYPE  /aplx/eif_pmitm_t,
                    ls_hd TYPE /aplx/seif_pmhdr,
                    lt_pm TYPE   zaplx_pmprt_tt,
                    lt_lic TYPE  zaplx_lic_tt.
                .
                PARAMETERS : s_docno TYPE j_1i_doc_no.

                CALL FUNCTION 'FP_JOB_OPEN'
                CHANGING
                    ie_outputparams = fp_outputparams.
                IF sy-subrc <> 0.
                ENDIF.

                CALL FUNCTION 'FP_FUNCTION_MODULE_NAME'
                EXPORTING
                    i_name     = 'ZAPLX_ADOBEFORM_B081_NEW'
                IMPORTING
                    e_funcname = fm_name.


                SELECT SINGLE * FROM /aplx/teif_pmhdr INTO
                ls_hd WHERE doc_no = s_docno.
                IF sy-subrc = 0.
                SELECT * FROM /aplx/teif_pmitm INTO TABLE lt_it
                    WHERE doc_no = s_docno.
                SELECT * FROM /aplx/teif_pmprt INTO TABLE
                    lt_pm WHERE doc_no = s_docno.
                SELECT * FROM j_1i_licdtl INTO TABLE
                    lt_lic WHERE refdoc_no = s_docno.
                ENDIF.

                CALL FUNCTION fm_name
                EXPORTING
                    /1bcdwb/docparams = fp_docparams
                    is_hdr            = ls_hd
                    is_itm            = lt_it
                    ls_pmprt          = lt_pm
                    ls_lic            = lt_lic.
                IF sy-subrc <> 0.
                ENDIF.

                CALL FUNCTION \'FP_JOB_CLOSE\'
                .
                IF sy-subrc <> 0.

                ENDIF.
                `;

                // Modified code
                this.modifiedCode = `
                *&---------------------------------------------------------------------*
                *& Report  ZAPLX_TRAINING_ADOBE
                *&
                *&---------------------------------------------------------------------*
                *& This is a demo of merge view using codemirror.net 
                *&
                *&---------------------------------------------------------------------*

                REPORT zaplx_training_adobe.
                DATA : fm_name           TYPE rs38l_fnam,
                    fp_outputparams TYPE sfpoutputparams,
                    im_print TYPE /aplx/seif_exp_doc,
                    fp_docparams TYPE sfpdocparams,
                    lt_it TYPE  /aplx/eif_pmitm_t,
                    ls_hd TYPE /aplx/seif_pmhdr,
                    lt_pm TYPE   zaplx_pmprt_tt,
                    /* Begin of fix
                    lt_lic TYPE  zaplx_lic_tt. */
                    lt_lic TYPE  new_var_name.
                    /* End of fix */
                .
                PARAMETERS_1 : s_docno TYPE j_1i_doc_no.
                PARAMETERS_2 : s_docno TYPE j_1i_doc_no.

                CALL FUNCTION 'FP_JOB_OPEN'
                CHANGING
                    ie_outputparams = fp_outputparams.
                IF sy-subrc <> 0.
                ENDIF.

                CALL FUNCTION 'FP_FUNCTION_MODULE_NAME'
                EXPORTING
                    i_name     = 'ZAPLX_ADOBEFORM_B081_NEW'
                IMPORTING
                    e_funcname = fm_name.


                SELECT SINGLE * FROM /aplx/teif_pmhdr INTO
                ls_hd WHERE doc_no = s_docno.
                IF sy-subrc = 0.
                SELECT * FROM /aplx/teif_pmitm INTO TABLE lt_it
                    WHERE doc_no = s_docno.
                SELECT * FROM /aplx/teif_pmprt INTO TABLE
                    lt_pm WHERE doc_no = s_docno.
                SELECT * FROM j_1i_licdtl INTO TABLE
                    lt_lic WHERE refdoc_no = s_docno.
                ENDIF.

                CALL FUNCTION fm_name
                EXPORTING
                    /1bcdwb/docparams = fp_docparams
                    is_hdr            = ls_hd
                    is_itm            = lt_it
                    ls_pmprt          = lt_pm
                    ls_lic            = lt_lic.
                IF sy-subrc <> 0.
                ENDIF.

                CALL FUNCTION "FP_JOB_CLOSE"
                .
                IF sy-subrc <> 0.

                ENDIF.
                `;

                
            },

            onAfterRendering: function() {
                // Create a CodeMirror Merge View instance
                //container-project1---View1--merge-view
                //"application-project1-display-component---View1--merge-view"
                const mergeView = CodeMirror.MergeView(document.getElementById("container-project1---View1--merge-view"), {
                    value: this.originalCode,  // set this to the base content
                    origLeft: null,
                    orig: this.modifiedCode,   // set this to the modified content
                    lineNumbers: true,
                    mode: "javascript",
                    highlightDifferences: true, // enable highlighting differences
                    });
            }
        });
    });
