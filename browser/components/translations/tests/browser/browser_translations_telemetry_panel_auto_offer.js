/* Any copyright is dedicated to the Public Domain.
   http://creativecommons.org/publicdomain/zero/1.0/ */

"use strict";

/**
 * Tests that the popup is automatically offered.
 */
add_task(async function test_translations_panel_auto_offer() {
  const { cleanup } = await loadTestPage({
    page: TRANSLATIONS_TESTER_ES,
    languagePairs: LANGUAGE_PAIRS,
    autoOffer: true,
  });

  await waitForTranslationsPopupEvent("popuphidden", () => {
    click(
      getByL10nId("translations-panel-translate-cancel"),
      "Click the cancel button."
    );
  });

  await TestTranslationsTelemetry.assertEvent(
    "OpenPanel",
    Glean.translationsPanel.open,
    {
      expectedEventCount: 1,
      expectNewFlowId: true,
      allValuePredicates: [
        value => value.extra.auto_show === "true",
        value => value.extra.view_name === "defaultView",
        value => value.extra.opened_from === "translationsButton",
        value => value.extra.document_language === "es",
      ],
    }
  );

  await TestTranslationsTelemetry.assertEvent(
    "CancelButton",
    Glean.translationsPanel.cancelButton,
    {
      expectedEventCount: 1,
      expectNewFlowId: false,
    }
  );

  await TestTranslationsTelemetry.assertEvent(
    "ClosePanel",
    Glean.translationsPanel.close,
    {
      expectedEventCount: 1,
      expectNewFlowId: false,
    }
  );

  await navigate(
    TRANSLATIONS_TESTER_ES_2,
    "Navigate to another page on the same domain."
  );

  await assertTranslationsButton(
    { button: true },
    "The button is still shown."
  );

  await waitForTranslationsPopupEvent("popupshown", async () => {
    await navigate(
      TRANSLATIONS_TESTER_ES_DOT_ORG,
      "Navigate to a page on a different domain."
    );
  });

  await waitForTranslationsPopupEvent("popuphidden", () => {
    click(
      getByL10nId("translations-panel-translate-cancel"),
      "Click the cancel button."
    );
  });

  await TestTranslationsTelemetry.assertEvent(
    "OpenPanel",
    Glean.translationsPanel.open,
    {
      expectedEventCount: 2,
      expectNewFlowId: true,
      allValuePredicates: [
        value => value.extra.auto_show === "true",
        value => value.extra.view_name === "defaultView",
        value => value.extra.opened_from === "translationsButton",
        value => value.extra.document_language === "es",
      ],
    }
  );

  await TestTranslationsTelemetry.assertEvent(
    "CancelButton",
    Glean.translationsPanel.cancelButton,
    {
      expectedEventCount: 2,
      expectNewFlowId: false,
    }
  );

  await TestTranslationsTelemetry.assertEvent(
    "ClosePanel",
    Glean.translationsPanel.close,
    {
      expectedEventCount: 2,
      expectNewFlowId: false,
    }
  );

  await cleanup();
});
