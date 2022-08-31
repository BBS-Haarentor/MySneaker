"""1_stock_tender_data_add

Revision ID: 9ab3b6744458
Revises: bea9df226f6c
Create Date: 2022-08-31 09:47:42.449232

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision = '9ab3b6744458'
down_revision = 'bea9df226f6c'
branch_labels = None
depends_on = None



def upgrade():
    op.add_column('stock',column=sa.Column('tender_sales', sa.INTEGER(), nullable=True))
    op.add_column('stock',column=sa.Column('tender_price', sa.FLOAT(), nullable=True))

def downgrade():
    op.drop_column('stock', column_name='tender_sales')
    op.drop_column('stock', column_name='tender_price')