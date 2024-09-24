// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import {
  Stack,
  Box,
  Field,
  FieldLabel,
  FieldHint,
  FieldError,
  FieldInput,
  FieldAction,
  IconButton,
  IconButtonGroup,
  Grid,
  GridItem,
  Select,
  Option,
} from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { Bold, Italic, StrikeThrough, Underline as UnderlineIcon, BulletList, NumberList, Quote, Paragraph, HeadingOne, HeadingTwo, HeadingThree, HeadingFour, HeadingFive } from "@strapi/icons"
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Strike from '@tiptap/extension-strike';
import Underline from '@tiptap/extension-underline'
import PropTypes from 'prop-types';
import {
  ProseMirrorStyled,
  HorizontalRuleIcon,
  CodeIcon,
  LinkIcon,
  UnlinkIcon,
  LeftAlignIcon,
  CenterAlignIcon,
  RightAlignIcon,
  JustifyAlignIcon
} from './styles.js';

const onHeadingChange = (editor, type) => {
  switch (type) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      editor.chain().focus().toggleHeading({ level: parseInt(type.replace('h', '')) }).run()
      break;
    case 'paragraph':
      editor.chain().focus().setParagraph().run()
      break;
  }
}

const Toolbar = ({ editor }) => {
  let selectedTextStyle = "none"

  if (editor.isActive('heading', { level: 1 })) selectedTextStyle = "h1"
  if (editor.isActive('heading', { level: 2 })) selectedTextStyle = "h2"
  if (editor.isActive('heading', { level: 3 })) selectedTextStyle = "h3"
  if (editor.isActive('heading', { level: 4 })) selectedTextStyle = "h4"
  if (editor.isActive('heading', { level: 5 })) selectedTextStyle = "h5"
  if (editor.isActive('heading', { level: 6 })) selectedTextStyle = "h6"
  if (editor.isActive('paragraph')) selectedTextStyle = "paragraph"
  return (
    <Box>
      <Grid gap={2}>
        <GridItem minWidth="150px">
          <Select
            id="select1"
            required size="S"
            placeholder="Text style"
            onChange={(val) => onHeadingChange(editor, val)}
            value={selectedTextStyle}

          >
            <Option value={'paragraph'}>Paragraph</Option>
            <Option value={'h1'}>Heading 1</Option>
            <Option value={'h2'}>Heading 2</Option>
            <Option value={'h3'}>Heading 3</Option>
            <Option value={'h4'}>Heading 4</Option>
            <Option value={'h5'}>Heading 5</Option>
          </Select>
        </GridItem>
        <GridItem>
          <IconButtonGroup>
            <IconButton icon={<Bold />} variant={editor.isActive('bold') ? 'secondary' : ''} label="Bold" onClick={() => editor.chain().focus().toggleBold().run()}></IconButton>
            <IconButton icon={<Italic />} variant={editor.isActive('italic') ? 'secondary' : ''} label="Italic" onClick={() => editor.chain().focus().toggleItalic().run()}></IconButton>
            <IconButton icon={<UnderlineIcon />} variant={editor.isActive('underline') ? 'secondary' : ''} label="Underline" onClick={() => editor.chain().focus().toggleUnderline().run()}></IconButton>
            <IconButton icon={<StrikeThrough />} variant={editor.isActive('strike') ? 'secondary' : ''} label="Strike" onClick={() => editor.chain().focus().toggleStrike().run()}></IconButton>
          </IconButtonGroup>
        </GridItem>
        <GridItem>
          <IconButtonGroup>
            <IconButton icon={<BulletList />} variant={editor.isActive('bulletList') ? 'secondary' : ''} label="Bullet List" onClick={() => editor.chain().focus().toggleBulletList().run()}></IconButton>
            <IconButton icon={<NumberList />} variant={editor.isActive('orderedList') ? 'secondary' : ''} label="Ordered List" onClick={() => editor.chain().focus().toggleOrderedList().run()}></IconButton>
          </IconButtonGroup>
        </GridItem>
        <GridItem>
          <IconButtonGroup>
          <IconButton icon={<LeftAlignIcon />} variant={editor.isActive({ textAlign: 'left' }) ? 'secondary' : ''} label="Ordered List" onClick={() => editor.chain().focus().setTextAlign('left').run()}></IconButton>
            <IconButton icon={<CenterAlignIcon />} variant={editor.isActive({ textAlign: 'center' }) ? 'secondary' : ''} label="Ordered List" onClick={() => editor.chain().focus().setTextAlign('center').run()}></IconButton>
            <IconButton icon={<RightAlignIcon />} variant={editor.isActive({ textAlign: 'right' }) ? 'secondary' : ''} label="Ordered List" onClick={() => editor.chain().focus().setTextAlign('right').run()}></IconButton>
            <IconButton icon={<JustifyAlignIcon />} variant={editor.isActive({ textAlign: 'justify' }) ? 'secondary' : ''} label="Ordered List" onClick={() => editor.chain().focus().setTextAlign('justify').run()}></IconButton>
          </IconButtonGroup>
        </GridItem>
        <GridItem>
          <IconButtonGroup>
            {editor.isActive('link') ? (
              <IconButton
                icon={<UnlinkIcon />}
                label="Unlink"
                onClick={() => editor.chain().focus().unsetLink().run()}
              ></IconButton>
            ) : (
              <IconButton icon={<LinkIcon />} variant={editor.isActive('link') ? 'secondary' : ''} label="Link" onClick={() => {
                const url = prompt('Enter the URL');
                if (url) {
                  editor.chain().focus().setLink({ href: url }).run();
                }
              }}></IconButton>
            )}
            <IconButton icon={<CodeIcon />} variant={editor.isActive('code') ? 'secondary' : ''} label="Code" onClick={() => editor.chain().focus().toggleCode().run()}></IconButton>
            <IconButton icon={<Quote />} variant={editor.isActive('blockquote') ? 'secondary' : ''} label="Blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()}></IconButton>
            <IconButton icon={<HorizontalRuleIcon />} variant={editor.isActive('horizontalRule') ? 'secondary' : ''} label="Horizontal Rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}></IconButton>
          </IconButtonGroup>
        </GridItem>
      </Grid>
    </Box>
  )
};

const TiptapEditor = ({ name, onChange, value, intlLabel, labelAction, disabled, error, description, required }) => {
  const { formatMessage } = useIntl();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Color,
      TextStyle,
      Highlight,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Strike,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        defaultAlignment: 'left',
      }),
    ],
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
        <Toolbar editor={editor} />
        <Box hasRadius={true} overflow={'auto'} maxHeight="70vh" borderWidth="1px" borderStyle="solid" borderColor="neutral200">
          <Box padding={4}>
            <ProseMirrorStyled>
              <EditorContent editor={editor} />
            </ProseMirrorStyled>
          </Box>
        </Box>
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

TiptapEditor.defaultProps = {
  value: '',
  disabled: false,
  error: undefined,
  description: '',
  required: false,
  intlLabel: {},
  labelAction: null,
};

TiptapEditor.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  intlLabel: PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: PropTypes.string,
  }),
  labelAction: PropTypes.object,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      id: PropTypes.string,
      defaultMessage: PropTypes.string,
    }),
  ]),
  required: PropTypes.bool,
};

export default TiptapEditor;
