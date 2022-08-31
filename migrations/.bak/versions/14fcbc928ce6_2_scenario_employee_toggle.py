"""2_scenario_employee_toggle

Revision ID: 14fcbc928ce6
Revises: 9ab3b6744458
Create Date: 2022-08-31 10:05:04.068383

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision = '14fcbc928ce6'
down_revision = '9ab3b6744458'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('scenario',column=sa.Column('employee_change_allowed', sa.BOOLEAN(), default=True))
    op.execute("UPDATE scenario SET employee_change_allowed = true")
    

def downgrade():
    op.drop_column('scenario', column_name='employee_change_allowed')
