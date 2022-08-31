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
    op.add_column('stock',column=sa.Column('tender_sales', sa.INTEGER(), nullable=True))
    op.add_column('stock',column=sa.Column('tender_price', sa.FLOAT(), nullable=True))

def downgrade():
    op.drop_column('stock', column_name='tender_sales')
    op.drop_column('stock', column_name='tender_price')