import React, { useState, useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import { Stack } from '@strapi/design-system/Stack';
import { Box } from '@strapi/design-system/Box';
import { Field, FieldLabel, FieldHint, FieldError, FieldInput, FieldAction } from '@strapi/design-system/Field';
import { Typography } from '@strapi/design-system/Typography';
import { useIntl } from 'react-intl';
import StarterKit from '@tiptap/starter-kit';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ProseMirrorStyled = styled.div`
  .ProseMirror {
    outline: none;
    line-height: 1.25rem;
    color: ${({ theme }) => theme.colors.neutral800};
    min-height: 80px;

    > * + * {
      margin-top: 0.75em;
    }

    .ProseMirror-selectednode {
      border: 5px solid ${({ theme }) => theme.colors.neutral800};
      box-sizing: border-box;
    }

    strong {
      font-weight: bold;
    }

    em {
      font-style: italic;
    }

    ul,
    ol {
      margin-left: 1rem;
      padding: 0 1rem;

      li {
        margin-bottom: 0.5rem;

        &:last-child {
          margin-bottom: 0rem;
        }
      }
    }

    ul {
      li {
        list-style: disc;
      }
    }

    ol {
      li {
        list-style: decimal;
      }
    }

    h1 {
      font-size: 2em;
    }

    h2 {
      font-size: 1.75em;
    }

    h3 {
      font-size: 1.5em;
    }

    h4 {
      font-size: 1.25em;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1.1;
    }

    pre {
      background: #0d0d0d;
      color: #fff;
      font-family: monospace;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;

      code {
        color: inherit;
        padding: 0;
        background: none;
        font-size: 0.8rem;
      }
    }

    img {
      max-width: 100%;
      height: auto;
      display: block;
    }

    blockquote {
      padding-left: 1rem;
      border-left: 2px solid rgba(#0d0d0d, 0.1);
    }

    hr {
      border: 0;
      border-top: 2px solid rgba(13, 13, 13, 0.1);
      margin: 1rem 0;
    }

    table {
      width: 100%;
      table-layout: fixed;
      border: 1px solid ${({ theme }) => theme.colors.neutral600};
      th,
      td {
        border: 1px solid ${({ theme }) => theme.colors.neutral600};
        padding: ${({ theme }) => theme.spaces[2]};

        &.selectedCell {
          background: ${({ theme }) => theme.colors.primary500};
        }
      }

      th {
        background: ${({ theme }) => theme.colors.neutral300};
        vertical-align: middle;
      }
    }
  }
`;

const TiptapEditor = ({ name, onChange, value, intlLabel, labelAction, disabled, error, description, required }) => {
  const { formatMessage } = useIntl();
  const editor = useEditor({
    extensions: [StarterKit],
    parseOptions: {
      preserveWhitespace: 'full',
    },
    content: value || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange({ target: { name: name, value: html } });
    },
  });

  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  return (
    <Field required={required}>
      <Stack spacing={1}>
        <Box>
          <FieldLabel action={labelAction}> {formatMessage(intlLabel)}</FieldLabel>
        </Box>
        <ProseMirrorStyled>
          <EditorContent editor={editor} />
        </ProseMirrorStyled>
        {error &&
          <Typography variant="pi" textColor="danger600">
            {formatMessage({ id: error, defaultMessage: error })}
          </Typography>
        }
        {description &&
          <Typography variant="pi">
            {formatMessage(description)}
          </Typography>
        }
      </Stack>
    </Field>
  );
};

TiptapEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default TiptapEditor;