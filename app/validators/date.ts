import vine from '@vinejs/vine'

/**
 * Validates the creation action
 */
export const dateValidator = vine.compile(
  vine.object({
    dateInit: vine
      .date({
        formats: ['YYYY-MM-DD'],
      })
      .optional(),
    dateEnd: vine
      .date({
        formats: ['YYYY-MM-DD'],
      })
      .optional(),
  })
)
