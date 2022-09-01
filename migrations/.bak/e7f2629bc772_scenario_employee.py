"""stock_tender_data_add

Revision ID: e7f2629bc772
Revises: 
Create Date: 2022-08-27 09:43:49.279242

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision = 'e7f2629bc772'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('scenario',column=sa.Column('employee_change_allowed', sa.BOOLEAN(), default=True))
    op.execute("UPDATE scenario SET employee_change_allowed = true")
    
    # stock creation_date repair
    #op.alter_column('stock', 'creation_date', type_=sa.FLOAT, existing_type=sa)

def downgrade():
    op.drop_column('scenario', column_name='employee_change_allowed')
    #op.execute(f"UPDATE stock SET creation_date = {datetime.timestamp()}")
