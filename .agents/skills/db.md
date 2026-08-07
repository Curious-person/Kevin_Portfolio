## Table `projects`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `number` | `varchar` |  |
| `title` | `varchar` |  |
| `description` | `text` |  |
| `tag` | `varchar` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

## Table `case_studies`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `number` | `varchar` |  |
| `title` | `varchar` |  |
| `description` | `text` |  |
| `tag` | `varchar` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

## Table `designs`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `title` | `varchar` |  |
| `image` | `text` |  |
| `aspect_ratio` | `varchar` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

## Table `experience`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `company` | `varchar` |  |
| `role` | `varchar` |  |
| `dates` | `varchar` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

## Table `stats`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `varchar` | Primary |
| `value` | `varchar` |  |
| `label` | `varchar` |  |
| `offset_class` | `varchar` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

## Table `contact_submissions`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `name` | `varchar` |  |
| `email` | `varchar` |  |
| `phone` | `varchar` |  Nullable |
| `subject` | `varchar` |  |
| `message` | `text` |  |
| `submitted_at` | `timestamptz` |  |

## Table `resumes`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `filename` | `varchar` |  |
| `storage_url` | `text` |  |
| `file_size` | `int4` |  Nullable |
| `version` | `varchar` |  Nullable |
| `is_active` | `bool` |  Nullable |
| `created_at` | `timestamp` |  Nullable |
| `updated_at` | `timestamp` |  Nullable |

## Table `resume_requests`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `email` | `varchar` |  |
| `name` | `varchar` |  Nullable |
| `message` | `text` |  Nullable |
| `requested_at` | `timestamp` |  Nullable |

## RLS Policies

### `stats`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Allow public read access on stats` | SELECT | public | PERMISSIVE | `true` | — |

### `experience`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Allow public read access on experience` | SELECT | public | PERMISSIVE | `true` | — |

### `contact_submissions`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Allow only authenticated users to view submissions` | SELECT | authenticated | PERMISSIVE | `true` | — |
| `Allow public insert access on contact_submissions` | INSERT | public | PERMISSIVE | — | `true` |

### `case_studies`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Allow public read access on case_studies` | SELECT | public | PERMISSIVE | `true` | — |

### `projects`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Allow public read access on projects` | SELECT | public | PERMISSIVE | `true` | — |

### `designs`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Allow public read access on designs` | SELECT | public | PERMISSIVE | `true` | — |

### `resumes`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Allow public read resumes` | SELECT | public | PERMISSIVE | `true` | — |

### `resume_requests`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Allow public insert resume requests` | INSERT | public | PERMISSIVE | — | `true` |

