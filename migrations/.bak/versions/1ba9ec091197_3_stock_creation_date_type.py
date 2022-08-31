"""3_stock_creation_date_type

Revision ID: 1ba9ec091197
Revises: 14fcbc928ce6
Create Date: 2022-08-31 10:26:37.377090

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel
from datetime import datetime
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '1ba9ec091197'
down_revision = '14fcbc928ce6'
branch_labels = None
depends_on = None


def upgrade():

    # op.alter_column('stock', 'creation_date', nullable=True, existing_nullable=False)
    # op.execute("ALTER TABLE stock ALTER COLUMN creation_date TYPE FLOAT USING creation_date::double precision")
    # #op.alter_column('stock', 'creation_date', type_=sa.Float(), existing_type=postgresql.TIMESTAMP)
    # op.execute(f"UPDATE stock SET creation_date =  {datetime.timestamp()}")
    op.drop_column('stock', 'creation_date')
    op.add_column('stock', sa.Column('creation_date', sa.Float(), nullable=True))
    
def downgrade():
    pass
